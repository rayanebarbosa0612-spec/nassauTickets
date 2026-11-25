import React from "react";
import {createContext,useContext,useEffect,useState} from 'react';
import {me,login as authenticate} from '../services/api';
const Auth=createContext(null);export const useAuth=()=>useContext(Auth);
export function AuthProvider({children}){
 const [session,setSession]=useState(()=>{try{return JSON.parse(localStorage.getItem('fluxo.session'))}catch{return null}});
 const [checking,setChecking]=useState(!!session);const [error,setError]=useState('');
 function logout(){setSession(null);try{localStorage.removeItem('fluxo.session')}catch{}setChecking(false)}
 useEffect(()=>{if(!session?.accessToken){setChecking(false);return}let active=true;me(session.accessToken).then(()=>{if(active)setChecking(false)}).catch(e=>{if(!active)return;if(e.status===401||e.status===403){logout();setError(e.message)}else{setError('Não foi possível verificar a sessão. Entre novamente quando a rede voltar.');logout()}});return()=>{active=false}},[session?.accessToken]);
 async function login(username,password){const data=await authenticate(username,password);if(!data.accessToken)throw Error('Sessão inválida');setError('');setSession(data);try{localStorage.setItem('fluxo.session',JSON.stringify(data))}catch{} }
 return <Auth.Provider value={{user:session,checking,error,login,logout}}>{children}</Auth.Provider>;
}

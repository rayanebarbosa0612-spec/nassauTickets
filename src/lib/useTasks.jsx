import React from "react";
import {createContext,useContext,useEffect,useState} from 'react';
import {seedTasks,loadTasks} from './tasks';
import {todos} from '../services/api';
const Context=createContext(null);
export const useTasks=()=>useContext(Context);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{return fallback}};
const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value))}catch{}};
export function TaskProvider({user,children}){
 const key=`fluxo.tasks.${user?.id ?? 'guest'}`;
 const [tasks,setRaw]=useState(()=>read(key, user ? loadTasks() : seedTasks));
 const [status,setStatus]=useState('loading'); const [attempt,setAttempt]=useState(0); const [message,setMessage]=useState('');
 const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{if(!user){setHydrated(true);return} let active=true;setStatus('loading');
 todos(user.id).then(data=>{if(!active)return;if(!Array.isArray(data.todos))throw Error('Resposta inválida');
 const remote=data.todos.map(t=>({id:`api-${t.id}`,title:String(t.todo).slice(0,80),description:'Importada do DummyJSON',category:'Outros',priority:'media',dueDate:new Date(Date.now()+86400000*7).toISOString().slice(0,10),completed:!!t.completed,favorite:false,createdAt:0}));
 const known=read(`${key}.imported`,[]); const fresh=remote.filter(t=>!known.includes(t.id));
 setRaw(prev=>{const next=[...prev,...fresh.filter(t=>!prev.some(p=>p.id===t.id))];write(key,next);return next});write(`${key}.imported`,[...new Set([...known,...remote.map(t=>t.id)])]);setStatus('success');setHydrated(true);
 }).catch(()=>{if(active){setStatus('error');setHydrated(true)}});return()=>{active=false}},[user?.id,attempt,key]);
 function setTasks(update){setRaw(prev=>{const next=typeof update==='function'?update(prev):update;write(key,next);return next});setMessage('Alteração salva neste navegador.');}
 return <Context.Provider value={{tasks,setTasks,status,hydrated,message,retry:()=>setAttempt(n=>n+1)}}>{children}</Context.Provider>;
}

import React from "react";
import {NavLink} from 'react-router-dom';
import {useAuth} from '../lib/auth';
export function Nav(){const {user,logout}=useAuth();return <nav className="nav"><NavLink to="/" className="brand">Fluxo</NavLink><div><NavLink to="/" end>Início</NavLink><NavLink to="/tarefas">Tarefas</NavLink><NavLink to="/nova-tarefa">Nova tarefa</NavLink>{user?<button onClick={logout}>Sair ({user.firstName})</button>:<NavLink to="/login">Entrar</NavLink>}</div></nav>}

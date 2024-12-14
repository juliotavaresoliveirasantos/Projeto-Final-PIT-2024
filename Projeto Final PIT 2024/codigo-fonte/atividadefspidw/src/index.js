import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navbar from './Componentes/Navbar';
import Eventos from './Paginas/Eventos/Eventos';
import EventosCadastro from './Paginas/Eventos/EventosCadastro';
import Despesas from './Paginas/Despesas/Despesas';
import DespesasCadastro from './Paginas/Despesas/DespesasCadastro';
import Doadores from './Paginas/Doadores/Doadores';
import DoadorCadastro from './Paginas/Doadores/DoadorCadastro';
import Membros from './Paginas/Membros/Membros'; // Importando a página de membros
import MembroCadastro from './Paginas/Membros/MembroCadastro'; // Importando a página de cadastro de membros
import Doacao from './Paginas/Doacoes/Doacao';
import DoacaoCadastro from './Paginas/Doacoes/DoacoesCad';



const router = createBrowserRouter(
  [
    {
      element: <Navbar></Navbar>,
      children: [
        {
          path: '/',
          element: <App></App>
        },
        {
          path: '/eventos',
          element: <Eventos></Eventos>
        },
        {
          path: '/eventos/:idEvento',
          element: <EventosCadastro></EventosCadastro>
        },
        {
          path: '/evento/novo',
          element: <EventosCadastro></EventosCadastro>
        },
        {
          path: '/despesas',
          element: <Despesas></Despesas>
        },
        {
          path: '/despesas/:idDespesa',
          element: <DespesasCadastro></DespesasCadastro>
        },
        {
          path: '/despesa/novo',
          element: <DespesasCadastro></DespesasCadastro>
        },
        {
          path: '/doadores',
          element: <Doadores></Doadores>
        },
        {
          path: '/doadores/:idDoador',
          element: <DoadorCadastro></DoadorCadastro>
        },
        {
          path: '/doadores/novo',
          element: <DoadorCadastro></DoadorCadastro>
        },
        {
          path: '/membros', 
          element: <Membros></Membros>
        },
        {
          path: '/membros/:idMembro', 
          element: <MembroCadastro></MembroCadastro>
        },
        {
          path: '/membros/novo', 
          element: <MembroCadastro></MembroCadastro>
        },
        {
          path: '/doacoes', 
          element: <Doacao></Doacao>
        },
        {
          path: '/doacoes/:idDoacao', 
          element: <DoacaoCadastro></DoacaoCadastro>
        },
        {
          path: '/doacoes/novo', 
          element: <DoacaoCadastro></DoacaoCadastro>
        }
      ]
    }
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);


reportWebVitals();

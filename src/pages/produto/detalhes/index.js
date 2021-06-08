import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {
        const { produto, index } = this.state;
 
        if (produto.ativo) {
            produto.ativo = "produto Ativo";
        } else {
            produto.ativo = "produto Inativo";
        }
 
        return (
            <div className="produto-info">
            <div class=" col-md-9 col-lg-9 "> 
            <table class="table table-user-information">
              <tbody>
                <tr>
                <td><h1> Produto: </h1></td>
                <td><h1> {produto.nome} </h1></td>                
                </tr>
                <tr>
                <td><h1> Status: </h1></td>
                <td><h1> {produto.ativo} </h1></td>                
                </tr>
                <tr>
                <td><h1> Categoria: </h1></td>
                <td><h1>{produto.categoria} </h1></td>                
                </tr>
                <tr>
                <td><h1> Preço: </h1></td>
                <td><h1>{new Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </h1></td>                
                </tr>
                <tr>
                <td><h1> Estoque: </h1></td>
                <td><h1> {produto.qtdEstoque} </h1></td>                
                </tr>
                <tr>
                <td><h1> Vencimento: </h1></td>
                <td><h1>{new Date(produto.dataVencimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })} </h1></td>                
                </tr>
                </tbody>
              
                <br />
                <tbody>
                <tr>
                <td> <Link to={`/produtos/`}> <button type="button" class="btn btn-primary">Voltar</button> </Link> </td>
                <td> <Link to={`/editarproduto/${produto.id}`}> <button type="button" class="btn btn-warning">Editar</button> </Link></td>
                <td> <Link to={`/deletarproduto/${produto.id}`}> <button type="button" class="btn btn-danger">Deletar</button> </Link></td>
                </tr>
                </tbody>
                </table>
            </div >

            </div>
        );
    }
}

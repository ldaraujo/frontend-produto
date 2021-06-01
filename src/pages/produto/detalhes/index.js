import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
 
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
                <h1> {produto.nome} </h1>
                <h1> {produto.ativo} </h1>
                <h1> {produto.categoria} </h1>
                <h1> {produto.preco} </h1>
                <h1> {produto.qtdEstoque} </h1>
                <h1> {produto.dataVencimento} </h1>
                <br />
                <Link to={`/produtos`}> Voltar </Link> <br />
                <Link to={`/editarproduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarproduto/${produto.id}`}> Deletar </Link> <br />
            </div >
        );
    }
}

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import './index.css';
 
class Editarproduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nome: "",
                categoria: "",
                preco: "",
                qtdEstoque: "",
                dataVencimento:"",
                ativo: "true"
            },
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <div className="produto-info">
                <form onSubmit={this.handleSubmit}>
                    <fieldset className="box-editar">
                        <legend>Editar Produto</legend>
                        <div className="produto-update">
                        <label htmlFor="nome">Nome </label>
                            <br />
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                        <label htmlFor="categoria"> Categoria </label>
                            <br />
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                placeholder="categoria"
                                required
                                value={this.state.produto.categoria}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                        <label htmlFor="preco">Preço </label>
                            <br />
                            <input
                                type="text"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                required
                                value={this.state.produto.preco}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                        <label htmlFor="qtdEstoque">Quantidade em Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="qtdEstoque"
                                name="qtdEstoque"
                                placeholder="Quantidade em Estoque"
                                required
                                value={this.state.produto.qtdEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="produto-update">
                        <label htmlFor="dataVencimento">Data de Vencimento </label>
                            <br />
                            <input
                                type="date"
                                id="dataVencimento"
                                name="dataVencimento"
                                placeholder="Data de Vencimento"
                                required
                                value={this.state.produto.dataVencimento}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <table className="button-editar">
                        <br />
                        <tbody>
                        <tr>
                        <td> <Link to={`/produtos/`}> <button type="button" class="btn btn-warning">Voltar</button> </Link> </td>
                        <td>
                            <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
                    </td>
                    </tr>
                </tbody>
                </table>
                    </fieldset>
                </form>
                </div>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produto;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default Editarproduto;

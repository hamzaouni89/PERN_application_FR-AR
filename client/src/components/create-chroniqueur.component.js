import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Translation } from 'react-i18next';
import i18next from 'i18next';
import TextField from '@material-ui/core/TextField';
import "./file.css"
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
export default class CreateChroniqueur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeNumTel = this.onChangeNumTel.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: "",
            nomErreur : "",
            prenom: "",
            prenomErreur : "",
            date_naissance: new Date(),
            date_naissanceErreur : "",
            num_tel: null,
            num_telErreur : ""
        }
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangePrenom(e) {
        this.setState({
            prenom: e.target.value
        })
    }

    onChangeNumTel(e) {
        this.setState({
            num_tel: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date_naissance: date
        })
    }

    validate = () => {
        let isError = false ;
        const errors = {
            nomErreur : "",
            prenomErreur :"",
            num_telErreur : "",
            date_naissanceErreur :""
        };

        if (this.state.nom.length < 3){
            isError = true;
            errors.nomErreur = "Nom need to be atleast 3 caracteres long" 
        }
        if (this.state.prenom.length < 3){
            isError = true;
            errors.prenomErreur = "Prenom need to be atleast 3 caracteres long" 
        }
        if (this.state.num_tel.length < 8){
            isError = true;
            errors.num_telErreur = "Num Tel need to be atleast 8 number long" 
        }
        if(isError){
            this.setState({
                ...this.state,
                ...errors
            });
        }
        
    }

    onSubmit(e) {
        e.preventDefault();
        const err = this.validate();
        if(!err){
            const chroniqueur = {
                nom: this.state.nom,
                prenom: this.state.prenom,
                num_tel: this.state.num_tel,
                date_naissance: this.state.date_naissance
            }
    
            axios.post('http://localhost:5000/chroniqueurs/add', chroniqueur)
                .then(res => console.log(res.data));

                
            toast.success('Le chroniqueur a été ajouté avec succès !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
    
            window.location = '/listChroniqueurs';
        }
        
    }


    render() {
        const language = i18next.languages[0];
        let dir = null;
        let label = null
        if (language === "ar") {
            dir = DIRECTIONS.RTL;
            label = "formlabel" ;
        } else {
            dir = DIRECTIONS.LTR;
        }
        return (
            <DirectionProvider direction={dir}>
                <div>
                    <h3 className={label}><Translation>{(t) => <>{t('Add_chroniqueur.1')}</>}</Translation></h3>
                    <form className={label} onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Name.1')}</>}</Translation> </label>
                            <TextField  type="text"
                                required
                                variant="outlined"
                                className="form-control"
                                value={this.state.nom}
                                onChange={this.onChangeNom}
                                errorText ={this.state.nomErreur}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('LastName.1')}</>}</Translation> </label>
                            <TextField type="text"
                                required
                                variant="outlined"
                                className="form-control"
                                value={this.state.prenom}
                                onChange={this.onChangePrenom}
                                errorText ={this.state.prenomErreur}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Num_Tel.1')}</>}</Translation> </label>
                            <TextField type="number"
                                required
                                variant="outlined"
                                className="form-control"
                                value={this.state.num_tel}
                                onChange={this.onChangeNumTel}
                                errorText ={this.state.num_telErreur}
                            />
                        </div>
                        <div className="form-group">
                            <label><Translation>{(t) => <>{t('Date_naissance.1')}</>}</Translation> </label>
                            <div>
                                <DatePicker
                                    selected={this.state.date_naissance} onChange={this.onChangeDate} />
                            </div>
                        </div>

                        <div className="form-group">
                            <button type='submit' className="btn btn-primary"
                            ><Translation>{(t) => <>{t('Add.1')}</>}</Translation></button>
                        </div>
                    </form>
                </div>
            </DirectionProvider>
        )
    }
}
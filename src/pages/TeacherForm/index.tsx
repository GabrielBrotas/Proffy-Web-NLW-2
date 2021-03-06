import React, {FormEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { StateProps } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { createNewClass } from '../../redux/actions/classesActions'

import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'

import warningIcon from '../../assets/images/icons/warning.svg'
import defaultUserImage from '../../assets/images/default-image.png'

import './styles.css'

function TeacherForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const usersState = useSelector((state: StateProps) => state.users)
    const {credentials} = usersState
    
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')
    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to:''},
    ])

    function addNewScheduleItems() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: "", to: ""}
        ])
    }

    function setScheduleItemsValue(position: number, field: string, value: string) {
        // percorrer o objeto do array e a posição
        const updatedScheduleItems = scheduleItems.map( (scheduleItem, index) => {
            //  se o index for igual a posição
            if(index === position) {
                // ex: (0, 'week_day', '2') -> vai retornar o objeto que a posição é igual ao do index e alterar o campo, neste caso, 'week_day' para o valor '2'
                return {... scheduleItem, [field]: value}
            }
            // caso não seja o mesmo index ele vai retornar o objeto sem alteração
            return scheduleItem
        })
        setScheduleItems(updatedScheduleItems)
    }

    // e: FormEvent -> vai falar que a função vem de um formulario, assim vamos ter acesso ao preventDefault
    function handleCreateClass(e: FormEvent) {
        // e.preventDefault vai impedir o comportamento padrao de um form, que é de mandar informações e atualizar pagina
        e.preventDefault()

        const classData = {
            user_id: credentials.userId,
            subject,
            cost: Number(cost),
            whatsapp,
            bio,
            schedule: scheduleItems
        }
        dispatch(createNewClass(classData, history))
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas"
            description="O primeiro passo é preencher esse formulário de inscrição."
            tag="Dar aulas"
            />
            {/* conteudo principal da pag */}
            <main>
                <form onSubmit={handleCreateClass}>
                {/* fieldset é um conjunto para representar um bloco dentro de um formulário */}
                <fieldset>
                    {/* titulo para o fieldset */}
                    <legend>Seus dados</legend>
                    
                    <div className="user-data">
                        <img src={credentials.avatar ? credentials.avatar : defaultUserImage} alt="user avatar" width="75px" height="75px"/>

                        <span>{credentials.name}</span>

                        <Input label="Whatsapp" type="tel" placeholder="( ) _ ____ - ____" name="whatsapp" value={whatsapp} onChange={ e => setWhatsapp(e.target.value)} />
                    </div>
                    
                    <Textarea label="Biografia" name="bio" value={bio} onChange={ e => setBio(e.target.value)} />
                </fieldset>
                
                <fieldset>
                    {/* titulo para o fieldset */}
                    <legend>Sobre a Aula</legend>
                    <div className="about-class">
                        <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}
                            onChange={ e => setSubject(e.target.value)} 
                            options={[
                                { value: 'Artes', label: "Artes"},
                                { value: 'Matematica', label: "Matematica"},
                                { value: 'Ações', label: "Ações"},
                                { value: 'Investimentos', label: "Investimentos"},
                                { value: 'Educação Financeira', label: "Educação Financeira"},
                            ]}
                        />

                        <div className="input-money">
                            <span className="input-group-addon">
                                R$
                            </span>
                            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={ e => setCost(e.target.value)} />
                        </div>
                        
                    </div>
                </fieldset>
                
                <fieldset>
                    {/* titulo para o fieldset */}
                    <legend>Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItems}>
                        + Novo Horário
                        </button>
                    </legend>
                    
                    {scheduleItems.map( (scheduleItem, index) => (
                        <div className="schedule-item" key={index}>
                        <Select 
                            label="Dia da semana" 
                            name="week_day"
                            value={scheduleItem.week_day}
                            onChange={ e => setScheduleItemsValue(index, 'week_day', e.target.value)}
                            options={[
                                { value: '0', label: "Domingo"},
                                { value: '1', label: "Segunda-Feira"},
                                { value: '2', label: "Terça-Feira"},
                                { value: '3', label: "Quarta-Feira"},
                                { value: '4', label: "Quinta-Feira"},
                                { value: '5', label: "Sexta-Feira"},
                                { value: '6', label: "Sábado"},
                            ]}
                        />
                        <Input 
                            label="Das" 
                            name="from"
                            type="time"
                            value={scheduleItem.from}
                            onChange={ e => setScheduleItemsValue(index, 'from', e.target.value)}
                        />

                        <Input 
                            label="Até"
                            name="to" 
                            type="time"
                            value={scheduleItem.to}
                            onChange={ e => setScheduleItemsValue(index, 'to', e.target.value)}
                        />
                    </div>
                    ))}
                    
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante" />
                        Important! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">
                        Salvar cadastro
                    </button>
                </footer>
                </form>  
            </main>

        </div>
    )
}

export default TeacherForm
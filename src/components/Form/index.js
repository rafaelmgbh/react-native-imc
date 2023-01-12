import React , {useState} from "react";
import { View,Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";


export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [TextButton, setTextButton] = useState("Calcular IMC");
    const [errorMessage, setErrorMessage] = useState(null);

    function calculateImc(){
        // Calcula o IMC , substitui a virgula por ponto e arredonda o resultado para 2 casas decimais
        let heightFormat = height.replace(",", ".");
        return setImc((weight / (height * height)).toFixed(2));
    }

    function verificationImc(){
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("Este campo obrigatório");
        }
    }

    function validateImc(){
        if (height != null && weight != null){
            calculateImc();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é:");
            setTextButton("Calcular Novamente");
            setErrorMessage(null);            
        }else{
            verificationImc();
            setImc(null);
            setMessageImc("Preencha o peso e altura");
            setTextButton("Calcular IMC");            
        }
    }

    return(
        //Pressable e um componente que permite que o usuario clique em qualquer lugar da tela e o teclado seja fechado , adicionando o onPress={Keyboard.dismiss} no componente
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>            
           <View style={styles.form}>
            <Text style={styles.formLabel}>Altura</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput style={styles.formInput} onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric"/>
            <Text style={styles.formLabel}>Peso</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput style={styles.formInput} onChangeText={setWeight} value={weight} placeholder="Ex. 75.600" keyboardType="numeric"/> 
            <TouchableOpacity style={styles.buttonCalculator} onPress={validateImc}> 
            <Text style={styles.textButtonCalculator}>{TextButton}</Text>           
            </TouchableOpacity>           
           </View>
           <ResultImc messageResultImc={messageImc} resultImc={imc} />       
        </Pressable>
    )
}
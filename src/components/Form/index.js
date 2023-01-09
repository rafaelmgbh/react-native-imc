import React , {useState} from "react";
import { View,Text, TextInput, Button } from "react-native";
import ResultImc from "./ResultImc";


export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [TextButton, setTextButton] = useState("Calcular IMC");

    function calculateImc(){
        return setImc((weight / (height * height)).toFixed(2));
    }

    function validateImc(){
        if (height != null && weight != null){
            calculateImc();
            setHeight(null);
            setWeight(null);
            setMessageImc("Seu IMC é:");
            setTextButton("Calcular Novamente");
        }else{
            setImc(null);
            setMessageImc("Preencha o peso e altura");
            setTextButton("Calcular IMC");
        }
    }

    return(
        <View>
           <View>
            <Text>Altura</Text>
            <TextInput onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric"/>
            <Text>Peso</Text>
            <TextInput onChangeText={setWeight} value={weight} placeholder="Ex. 75.600" keyboardType="numeric"/>
            <Button onPress={() =>validateImc()} title={TextButton}/>
           </View>
           <ResultImc messageResultImc={messageImc} resultImc={imc} />
           

        </View>
    )
}
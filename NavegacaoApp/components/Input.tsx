import { TextInput } from "react-native";
import type { TextInputProps } from "react-native";

export function Input({...rest }: TextInputProps ) {
 return (
     <TextInput 
        style={{ 
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10
        }} 
        {...rest} 
     />  
    )
}
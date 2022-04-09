import {useState} from "react";

function useForm(callback) {
    var [values,setValues]=useState({});
    function handleChange(e) {
        var temp = {...values};
        temp[e.target.name] = e.target.value;
        setValues(temp);
    }
    function handleSubmit(e){
        e.preventDefault();
        var temp = {...values};
       
        callback(temp);
    }
    return [values,handleChange,handleSubmit];
}
export default useForm;

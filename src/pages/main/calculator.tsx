import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { ListFormat } from "typescript";
import { useState } from "react";

// interface 
interface CalculateCaloriesData {
    gender : string;
    age : number;
    weight : number;
    height : number;
    factorPAL : number;
    target : number;
   
};
// definition of calculator component 
export const Calculator = () => {
    // 2 use state hooks
    const [BMR, setFactorBMR] = useState<number>(0);
    const [isSub, setIsSubmited] = useState<boolean>(false);
    // yap scheme with errors handling
    const schema = yup.object().shape({
        gender: yup.string().oneOf(["Man","Woman"]).required("Please select gender."),
        age: yup.number().positive().integer().min(16).required("You must add your age."),
        weight: yup.number().positive().min(30).required("You must add your weight."),
        height: yup.number().positive().min(100).required("You must add your age."),
        factorPAL: yup.number().positive().required("Please select your activity."),
        target: yup.number().oneOf([-500,0,500]).required("Please select your target."),
    });
    // use form hook. Is used to handle yup scheme
    const {register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm<CalculateCaloriesData>({
      resolver: yupResolver(schema), 
    });
    // this function is needed as the argument of handleSubmit - using by useForm
    const onCreateCPM = (data: CalculateCaloriesData) => { 
        try{ // calculate the BMR using Harrisa-Benedict's formula 
            if(data.gender === "Man"){
                setFactorBMR(Math.round((
                    66 + (13.7 * data.weight) 
                    + (5 * data.height) 
                    - (6.8 * data.age)) 
                    * data.factorPAL 
                    + data.target 
                    ));
            }
            else if(data.gender === "Woman"){
                setFactorBMR(Math.round((
                    665 + (9.6 * data.weight) 
                    + (1.8 * data.height) 
                    - (4.7 * data.age)) 
                    * data.factorPAL 
                    + data.target 
                    ));
            }
            else{
                throw new Error("Smth went wrong"); // It is only demostration of exception handling. 
            }
        }
        catch(err){
            console.log(err);
        }
        console.log(data);
    };
    // The calculator component returns yup validation form
    // it's the main visible part of the calorie calculator
    return (
        <form className="formCalculator" onSubmit={handleSubmit(onCreateCPM)}>
            <header> 
                <h1> Calorie Calculator</h1>
            </header>
            <h4> What is your gender? </h4>
            <select {...register("gender")}>
                <option value="Man">Male</option>
                <option value="Woman">Female</option>
            </select>
            
            <p style={{color: "red"}}> {errors.gender?.message}</p>
            
            <input type="number" placeholder="Age..." {...register("age")}/>
            <p style={{color: "red"}}> {errors.age?.message}</p>

            <input type="number" placeholder="Weight..." {...register("weight")}/>
            <p style={{color: "red"}}> {errors.weight?.message}</p>

            <input type="number" placeholder="Height..." {...register("height")}/>
            <p style={{color: "red"}}> {errors.height?.message}</p>

            <h4> How active are you? </h4>
            <select {...register("factorPAL")}>
                <option value= "1.0"> Sedentary: little or no excercise </option>
                <option value= "1.4"> Light: excercise 1-3 times/week </option>
                <option value="1.6"> Moderate: excercise 4-5 times/week </option>
                <option value= "1.75"> Active: daily excercise or intense exercise 3-4 times/week  </option>
                <option value="2">Very Active: intense exercise 6-7 times/week</option>
                <option value="2.2">Extra Active: very intense exercise daily, or physical job</option>
            </select>
            <p style={{color: "red"}}> {errors.factorPAL?.message}</p>

            <h4> What do you want? </h4>
            <select {...register("target")}>
                <option value= "-500"> to loose weight</option>
                <option value= "0"> to keep my weight </option>
                <option value="500"> to gain weight </option>
            </select>
            <p></p>
            <div>
            <input 
                type="submit"  
                value="Calculate" 
                className="submitForm" 
                onClick={() => setIsSubmited(true)}
            />
            </div>
            <div>
                {isSub &&
                    <input
                    type="button"
                    onClick={() => reset()}
                    value="Clear"
                    className="buttonForm"
                    /> 
                }
            </div>
            <div>
                <h1> You need daily {BMR} kcal </h1>
            </div>
        </form>
        );
};



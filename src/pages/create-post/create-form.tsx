import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc, collection} from "firebase/firestore";
import {auth, db} from '../../config/firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate} from "react-router-dom"
// interface used by yap form
interface CreateFormData {
    title: string;
    description: string;
}
// CreateForm component represents the form used to create the post
export const CreateForm = () => {
    // 2 hooks from installed libraries
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    // yap scheme with errors handling
    const schema = yup.object().shape({
        title: yup.string().required("You must add a title."),
        description: yup.string().required("You must add a title."),

    });
    // use form hook. Is used to handle yup scheme
    const {register, 
          handleSubmit,
          formState: {errors},
    } = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });
    // import posts from Firestore database
    const postsRef = collection(db, 'posts');
    // this function is needed as the argument of handleSubmit - using by useForm
    // it does add the posts to the firebase 
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid, // id used by google
        });

        navigate("/"); // navigate to the home page / it's only demonstration
    };
    // The create-form component returns yup validation form
    return (
    <form className="formPost" onSubmit={handleSubmit(onCreatePost)}>
        <input placeholder="Title..." {...register("title")}/>
        <p style={{color: "red"}}> {errors.title?.message}</p>
        <textarea placeholder="Description..." {...register("description")}/>
        <p style={{color: "red"}}> {errors.description?.message}</p>
        <input type="submit" 
            value="Submit" 
            className="submitForm"
        />
    </form>
    );
};



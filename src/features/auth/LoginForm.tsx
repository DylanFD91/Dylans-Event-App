import { Button, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { closeModal } from "../../app/common/modals/modalSlice";
import { useAppDispatch } from "../../app/store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";

export default function LoginForm() {
    const {register, handleSubmit, setError, formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
        mode:'onTouched'
    })
    const dispatch = useAppDispatch();

    async function onSubmit(data: FieldValues) {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            dispatch(closeModal());
        } catch (error: any) {
            setError('root.serverError', {
                type: '400', message: error.message
            })
        }
    }

  return (
    <ModalWrapper header='Sign in'>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input 
                defaultValue=''
                placeHolder='Email address'
                {...register('email', {required: true, pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/})}
                error={
                    errors.email?.type === 'required' && 'Email is Required' ||
                    errors.email?.type === 'pattern' && 'Email is Required'
                }
            />
            <Form.Input 
                type='password'
                defaultValue=''
                placeHolder='Password'
                {...register('password', {required: true})}
                error={errors.password && 'A password is Required'}
            />
            {errors.root && (
                <Label 
                    basic color='red'
                    style={{display: 'block', marginBottom: 10}}
                    content={errors.root.serverError.message}
                />
            )}
            <Button 
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting}
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Login'
            />
        </Form>
    </ModalWrapper>
  )
}

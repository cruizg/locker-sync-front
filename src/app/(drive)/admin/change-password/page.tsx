import { titlefont } from '@/config/fonts';
import Link from 'next/link';
import { ChangePasswordForm, } from './ui/ChangePasswordForm';
import { Title } from '@/components';

export default function ChangePasswordPage() {
  return (
    <>
      {/* <h1 className={ `${ titlefont.className } text-4xl mb-5` }>Nueva Cuenta</h1> */}
      <Title title="Cambio de Contraseña" />
      <ChangePasswordForm />
    </>
  );
}
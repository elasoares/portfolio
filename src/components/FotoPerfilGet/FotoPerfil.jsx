/* eslint-disable react/prop-types */
import { supabase } from "../../Supabaseconfig";

export function FotoPerfil({ className }) {
  const { data } = supabase.storage
    .from("imagens")
    .getPublicUrl("perfil.png");

  return (
    <img className={className} src={data?.publicUrl || fotoFallback} alt="Foto do perfil" />
  );
}
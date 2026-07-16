/* eslint-disable react/prop-types */
import { supabase } from "../../Supabaseconfig";

export function GetImagens({ nomeDaImagem }) {
  const { data } = supabase.storage
    .from("imagens")
    .getPublicUrl(nomeDaImagem);

  if (!data?.publicUrl) return null;

  return (
    <div>
      <img src={data.publicUrl} alt={nomeDaImagem} />
    </div>
  );
}
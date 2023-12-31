import useSupabase from "src/boot/supabase";
import useAuthUser from "./useAuthUser";
import { v4 as uuidv4 } from "uuid";

export default function userApi() {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const list = async (table) => {
    const { data, error } = await supabase.from(table).select("*");
    if (error) throw error;
    return data;
  };

  const getById = async (table, id) => {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data[0];
  };

  const post = async (table, form) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
        user_id: user.value.id,
      },
    ]);
    if (error) throw error;
    return data;
  };

  const update = async (table, form) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const remove = async (table, id) => {
    const { data, error } = await supabase.from(table).delete().match({ id });

    if (error) throw error;
    return data;
  };

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4();
    console.log("file", file);
    const { error } = supabase.storage.from(storage).upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });
    const publicUrl = await getUrlPublic(fileName, storage);
    console.log("public", publicUrl);
    if (error) throw error;

    return publicUrl;
  };

  const getUrlPublic = async (fileName, storage) => {
    const { data, error } = supabase.storage
      .from(storage)
      .getPublicUrl(fileName);
    console.log("data geturl", data.publicUrl);
    if (error) throw error;

    return data.publicUrl;
  };
  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
    getUrlPublic,
  };
}

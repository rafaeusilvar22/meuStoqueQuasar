import { ref } from "vue";
import useSupabase from "boot/supabase";

const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return user;
  };

  const loginWithSocialProvider = async ({ provider }) => {
    const { user, error } = await supabase.auth.signIn({ provider });

    if (error) throw error;
    return user;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`,
      }
    );
    if (error) throw error;
    return user;
  };

  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return user;
  };

  async function resetPassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      throw error;
    }
    return user;
  }
  // const resetPassword = async (acessToken, new_password) => {
  //   const { user, error } = await supabase.auth.updateUser({
  //     acessToken,
  //     password: new_password,
  //   });
  //   if (error) throw error;
  //   return user;
  // };

  return {
    user,
    login,
    loginWithSocialProvider,
    logout,
    isLoggedIn,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword,
  };
}

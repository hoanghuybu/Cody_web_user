import useLogin from "../hook/useLogin";

function LoginPage() {

    const {mutateAsync: onLogin, isLoading, data} = useLogin()


    const handleLogin = async () => {

        const body = {
            useName: "",
            password: ""
        }

       const data = await onLogin(body)
        
    }
  return (

    <div onClick={hadnleLogin}>
        {isLoading ? <LoadingView/> : (
            {/* Tên đăng nhập */}
      <input></input>
      {/* pass */}
      <input></input>
        )}
      
    </div>
  );
}

export default LoginPage;

export const isLoggedIn = () => {
    let token = localStorage.getItem("token");
    if(token !=null) return true;
    else return false;
};
 
export const doLogin = (response,next) => {
    localStorage.setItem("token", JSON.stringify(response.data.data.token));
    next()
};
 
export const doLogout = (next) => {
    localStorage.removeItem("token");
    next()
};
 
export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("token")).user;
    }else{
        return undefined;
    }
};

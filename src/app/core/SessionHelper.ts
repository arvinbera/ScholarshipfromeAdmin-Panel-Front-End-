export default class SessionHelper {

    public static Token:string="session";

    public static GetSession<T>():T {
        let data=localStorage.getItem(this.Token);
        if(!data || data=="undefined"){
            return null as unknown as T;
        }
        return JSON.parse(data) as T;
    }

    public static SetSession<T>(data:T){
        localStorage.setItem(this.Token,JSON.stringify(data));
    }

    public static GetApiToken<T> ():T {
        return {token: this.GetSession<any>()?.token } as unknown as T;
    }


    public static CheckAuth(){
        if(!SessionHelper.GetSession()){
            window.location.href="/login";
        }
    }
}
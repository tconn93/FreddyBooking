


class WebUtils {
  static backendURL = "http://localhost:5000/";

  static pingServer(url,options){
    return fetch(url,options)
    .then(resp => resp.json())
    .then(data=> data)
    .catch((err)=>{
        console.error(err);
    });
  }
  static saveNewArtist(newArtist){
    let url = this.backendURL+'artist';
    let options = {
        method:'POST',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'http://localhost:3000'},
        body: JSON.stringify(newArtist) };
    return this.pingServer(url,options);
  }
  static saveAvail(avail, artistId){
    let url = this.backendURL+'availability/'+artistId+'/edit';
    let options = {
        method:'POST',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'http://localhost:3000'},
        body:JSON.stringify(avail) };
    return this.pingServer(url,options);
  }

  static getOthers(){
    let url = this.backendURL+'artist';
    let option = {
        method:'GET',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'http://localhost:3000'}};
    return this.pingServer(url,option);
  }

  static getArtist(artistId){
    let url = this.backendURL+'artist/'+artistId;
    let option = { 
        method:'GET',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'http://localhost:3000'}};
    return this.pingServer(url,option);
  }

  static getAvails(artistId){
    let url = this.backendURL+'availability/'+artistId;
    let options ={
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'http://localhost:3000'}};
    return this.pingServer(url,options);
  }

  static   login(email, pword){
            let url = this.backendURL+'login';
            const myData = {
                email:email,
                pword:pword };
            let options = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                    ,'Access-Control-Allow-Origin':'http://localhost:3000'
                },
                body: JSON.stringify(myData) };
           return this.pingServer(url,options);
            }
}

export default WebUtils;



class WebUtils {
  static backendURL = "https://dustin.ink:5000/";

  static pingServer(url,options){
    return fetch(url,options)
    .then(resp => resp.json())
    .then(data=> data)
    .catch((err)=>{
        console.error(err);
    });
  }

  static requestBooking(data){
    let url = this.backendURL+'bookingRequest';
    let options = {method:'POST',
      headers:{'Content-Type':'application/json'
        ,'Access-Control-Allow-Origin':'https://dustin.ink'},
        body: JSON.stringify(data)
    }
    return this.pingServer(url,options);
  }

  static deleteAvail(availId){
    let url = this.backendURL+'availability/'+availId+'/delete';
    let options = {method:'DELETE',
      headers:{'Content-Type':'application/json'
        ,'Access-Control-Allow-Origin':'https://dustin.ink'}  };
    return this.pingServer(url,options);
  }
  static getArtistWithAvail(){
    let url = this.backendURL+'avails/artist';
    let options ={
      method:"GET",
      headers:{'Content-Type':'application/json'
        ,'Access-Control-Allow-Origin':'https://dustin.ink'}  };
    return this.pingServer(url,options);
  }
  static getBookByArtistAndDate(artistId, dateStr){
    let url = this.backendURL+'book/artist';
    let data ={artistId:artistId, date:dateStr}
    let options={method:'POST',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink'},
        body: JSON.stringify(data)};
    return this.pingServer(url,options);
  }
  static deleteBook(bookId){
    let url = this.backendURL+'delete_booking/'+bookId;
    let options = {
        method:'DELETE',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink',
            'Access-Control-Allow-Methods':'DELETE'} };
    return this.pingServer(url,options);
  }
  static getBooks(artistId){
    let url = this.backendURL+'book/'+artistId;
    let options ={
        method:'GET',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink'} };
    return this.pingServer(url,options);
  }
  static deleteBookRequest(bookId){
    let url = this.backendURL+'bookRequest/'+bookId;
    let options = {
        method:'DELETE',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink',
            'Access-Control-Allow-Methods':'DELETE'} };
    return this.pingServer(url,options);
  }
  static confirmBook(bookId){
    let url = this.backendURL+'bookRequest/'+bookId;
    let options = {
        method:'POST',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink'} };
    return this.pingServer(url,options);
  }
  static getBookingRequest(artistId){
    let url = this.backendURL+'bookingRequest/'+artistId;
    let options = {
        method:'GET',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'https://dustin.ink'} };
    return this.pingServer(url,options);
  }
  static saveNewArtist(newArtist){
    let url = this.backendURL+'artist';
    let options = {
        method:'POST',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'https://dustin.ink'},
        body: JSON.stringify(newArtist) };
    return this.pingServer(url,options);
  }
  static saveAvail(avail, artistId){
    let url = this.backendURL+'availability/'+artistId+'/edit';
    let options = {
        method:'POST',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'https://dustin.ink'},
        body:JSON.stringify(avail) };
    return this.pingServer(url,options);
  }

  static getOthers(){
    let url = this.backendURL+'artist';
    let option = {
        method:'GET',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'https://dustin.ink'}};
    return this.pingServer(url,option);
  }

  static getArtist(artistId){
    let url = this.backendURL+'artist/'+artistId;
    let option = { 
        method:'GET',
        headers:{'Content-Type':'application/json'
                ,'Access-Control-Allow-Origin':'https://dustin.ink'}};
    return this.pingServer(url,option);
  }

  static getAvails(artistId){
    let url = this.backendURL+'availability/'+artistId;
    let options ={
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'https://dustin.ink'}};
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
                    ,'Access-Control-Allow-Origin':'https://dustin.ink'
                },
                body: JSON.stringify(myData) };
           return this.pingServer(url,options);
            }
}

export default WebUtils;
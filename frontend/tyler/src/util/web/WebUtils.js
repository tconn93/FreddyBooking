


class WebUtils {
  static backendURL = "http://localhost:5000/";





  static saveAvail(avail, artistId){
    let url = this.backendURL+'availability/'+artistId+'/edit';
    const result = fetch(url,{
        method:'POST',
        headers:{'Content-Type':'application/json'
            ,'Access-Control-Allow-Origin':'http://localhost:3000'},
            body:JSON.stringify(avail)
    })
    .then(resp => resp.json())
    .then(data=> data)
    .catch((err)=>{
        console.error(err);
    });

    return result;

  }



  static getArtist(artistId){
    let url = this.backendURL+'artist/'+artistId;
    const result = fetch(url,{
        method:'GET',
        headers:{'Content-Type':'application/json'
                        ,'Access-Control-Allow-Origin':'http://localhost:3000'}
    })
    .then(resp => resp.json())
    .then(data=> data)
    .catch((err)=>{
        console.error(err);
    });

    return result;
  }

  static getAvails(artistId){
    let url = this.backendURL+'availability/'+artistId;

    const result = fetch(url,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json'
                        ,'Access-Control-Allow-Origin':'http://localhost:3000'
                    }

                    }).then(resp => resp.json())
                    .then(data =>data)
                    .catch((err)=>{
                        console.error(err)
                    });
                return result;
  }


  static   login(email, pword){
            let url = this.backendURL+'login';
            const myData = {
                email:email,
                pword:pword
            }
            console.log(JSON.stringify(myData));

            const result =  fetch(url,{
                                    method:'POST',
                                    headers:{
                                        'Content-Type':'application/json'
                                        ,'Access-Control-Allow-Origin':'http://localhost:3000'
                                    },
                                    body: JSON.stringify(myData)
                                }) 
                                .then( resp=> resp.json())
                                .then(data =>  {
                                    return data;
                                })
                                .catch((err)=>{
                                    console.error(err);
                                });

            return result;
            }


}

export default WebUtils;
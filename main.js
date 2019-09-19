if('serviceWorker' in navigator){
    navigator.serviceWorker
                .register('./sw.js')
                .then(()=>{
                    console.log('Connected');
                })
                .catch(()=>{
                    console.log('not Connected');
                });
}
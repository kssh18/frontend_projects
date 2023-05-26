let images = Array.from(document.getElementsByTagName('img'));
let buttonBrightness = document.getElementById('bright');
let buttongrayscale = document.getElementById('gray')
let redbtn = document.getElementById('red')
let greenbtn = document.getElementById('green')
let bluebtn = document.getElementById('blue')
let resButton = document.getElementById('res')

buttonBrightness.addEventListener('click',()=>{
    console.log("button clicked")
    images.forEach((item)=>{
        item.style.filter = "brightness(160%)";
    })
})
buttongrayscale.addEventListener('click',()=>{
    console.log("button clicked")
    images.forEach((item)=>{
        item.style.filter = "grayscale(100%)";
    })
})

resButton.addEventListener('click', () => {
    const maxWidth = 500; 
    const quality = 0.7; 
    console.log('res btn clicked')
    images.forEach((image) => {
        const img = new Image();
        img.src = image.src;

        img.addEventListener('load', () => {
            
            const ratio = maxWidth / img.width;
            const maxHeight = img.height * ratio;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            
            canvas.width = maxWidth;
            canvas.height = maxHeight;

            
            ctx.drawImage(img, 0, 0, maxWidth, maxHeight);

            
            const reducedImageData = canvas.toDataURL('image/jpeg', quality);

            
            image.src = reducedImageData;
        });
    });

    resButton.addEventListener('click', () => {
        const maxWidth = 500; 
        const quality = 0.7; 
    
        images.forEach((image) => {
            const img = new Image();
            img.src = image.src;
    
            img.addEventListener('load', () => {
                
                const ratio = maxWidth / img.width;
                const maxHeight = img.height * ratio;
    
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                
                canvas.width = maxWidth;
                canvas.height = maxHeight;
    
                
                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
    
            
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
    
                for (let i = 0; i < data.length; i += 4) {
                    
                    data[i + 1] += 50; 
                }
    
                
                ctx.putImageData(imageData, 0, 0);
    
                
                const reducedImageData = canvas.toDataURL('image/jpeg', quality);
    
                
                image.src = reducedImageData;
            });
        });
    });

    resButton.addEventListener('click', () => {
        const maxWidth = 500; 
        const quality = 0.7; 
    
        images.forEach((image) => {
            const img = new Image();
            img.src = image.src;
    
            img.addEventListener('load', () => {
                
                const ratio = maxWidth / img.width;
                const maxHeight = img.height * ratio;
    
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                
                canvas.width = maxWidth;
                canvas.height = maxHeight;
    
                
                ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
    
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
    
                for (let i = 0; i < data.length; i += 4) {
                    
                    data[i] += 50; 
                }
    
                
                ctx.putImageData(imageData, 0, 0);
    
                
                const reducedImageData = canvas.toDataURL('image/jpeg', quality);
    
                
                image.src = reducedImageData;
            });
        });
    });

    
});





// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite(bgImg, fgImg, fgOpac, fgPos) {
    // ab = 1

    //console.log(fgPos);
    // old color * (1-alpha) + new color * alpha

    // use a for loop to get all image pixels one by one
    // and use the alpha blending formula to attach it to the bg...?
    // how to get alpha value and how to put foreground on background

    for (let i = 0; i < bgImg.data.length; i += 4) { // getting number of the line i = x

        // how to caluclate stuff to access in the array

        // foreground -- xprime and offset used to find where fg is on bg image
        // find the difference between where it is on new image and old img

        // check if image is out of bounds
        //while(fgImg.length < bgImg.length) {
        let x = Math.floor(i / 4) % bgImg.width; // column
        let y = Math.floor(Math.floor(i / 4) / bgImg.width); // row

        var fgImgX = x-fgPos.x;
        var fgImgY = y-fgPos.y;

        // continue;
        // }

        // location of foreground image value
        // pos in array: height * x * 4 + 4 * y, where in the line is the current pixel
        // account for foreground offset using fgPos 

        var fgRed = 0;
        var fgBlue = 0;
        var fgGreen = 0;
        var fgAlpha = 0
        if(fgImgX >= 0 && fgImgX < fgImg.width && fgImgY >= 0 && fgImgY < fgImg.height) {
            var fgIndex = 4 * (fgImgY * fgImg.width + fgImgX);
            fgRed = (fgImg.data[fgIndex]/255)*255;
            fgGreen = (fgImg.data[fgIndex+1]/255)*255;
            fgBlue = (fgImg.data[fgIndex+2]/255)*255;
            fgAlpha = (fgImg.data[fgIndex+3]/255)*255;
        }


        // var fgIndex = y*fgImg.width*4+x*4 // try opposite x and y if doesnt work
        // 4 * (y * fgImg.width + x);

        //let i = 4 * (y * bgImg.width + x);

        // bgImg.data[i] = fgImg.data[fgPos];
        // bgImg.data[i + 1] = fgImg.data[fgPos + 1];
        // bgImg.data[i + 2] = fgImg.data[fgPos + 2];

        // black pixels shoudlnt be visible bc alpha channel = 0
        //const fgAlpha = fgImg.data[fgIndex + 3] /255;
        const backgroundOpacity = bgImg.data[i + 3] /255;

        var finalAlpha = (fgOpac *fgAlpha/255 + (1-(fgOpac *fgAlpha/255))*backgroundOpacity)*255;

        // red
        bgImg.data[i] = (fgOpac * fgAlpha/255*(fgRed/255) + (1 - fgOpac * fgAlpha/255)* backgroundOpacity * bgImg.data[i]/255)/(finalAlpha/255)*255;
        // green
        bgImg.data[i + 1] = (fgOpac  * fgAlpha/255*(fgGreen/255) + (1 -  fgAlpha/255 * fgOpac) * backgroundOpacity * bgImg.data[i + 1]/255)/(finalAlpha/255)*255;
        // blue
        bgImg.data[i + 2] = (fgOpac * fgAlpha/255*(fgBlue/255) + (1 - fgAlpha/255 * fgOpac) * backgroundOpacity * bgImg.data[i + 2]/255)/(finalAlpha/255)*255;
        // alpha
        bgImg.data[i + 3] = (finalAlpha/255)*255;

        // fgOpac * fgAlpha * fgImg.data[fgPos + 3] + (1 - fgAlpha * fgOpac) * bgImg.data[i + 3]

        
        //bgImg.data[i + 2] = bgImg.data[i + 3] = fgOpac * fgImg.data[fgPos + 2] + (1 - fgOpac) * bgImg.data[i + 2];
        //bgImg.data[i] = fgOpac * fgImg.data[fgPos] + (1 - fgOpac) * bgImg.data[i];

        // const r = bgImg.data[4*(i * bgImg.width + j)]// = x; // red
        // const g = bgImg.data[(4*(i * bgImg.width + j))+1] //= y; // green
        // const b = bgImg.data[(4*(i * bgImg.width + j))+2]// = 255 - x; // blue
        // const alpha = bgImg.data[(4*(i * bgImg.width + j))+3] //= 255; // alpha



    }

}
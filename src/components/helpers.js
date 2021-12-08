//this file contains various helper functions utilized throughout the program

//convert a raw number of bytes into a readable string of how large a particular uploaded file is
export function convertBytes(bytes) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

//truncate a string and follow it with ellipses (used for file names in the file component mainly)
export function truncate(str, n){
   return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
 };


//lightens or darkens a color (represented by a hex code) by an integer amount (used for making buttons darker tthan backgorund colors for components)
export function LightenDarkenColor(col, amt) {
  
   var usePound = false;
 
   if (col[0] == "#") {
       col = col.slice(1);
       usePound = true;
   }

   var num = parseInt(col,16);

   var r = (num >> 16) + amt;

   if (r > 255) r = 255;
   else if  (r < 0) r = 0;

   var b = ((num >> 8) & 0x00FF) + amt;

   if (b > 255) b = 255;
   else if  (b < 0) b = 0;

   var g = (num & 0x0000FF) + amt;

   if (g > 255) g = 255;
   else if (g < 0) g = 0;

   return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
 
}
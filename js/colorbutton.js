/* ############################################ */
const body = document.querySelector('body');
const cbc = document.querySelector('#CBC');


const arrayOfColors = [
  {
    name : "var(--Electric)",
    1 : "1.jpg",
    2 : "2.jpg",
    3 : "3.jpg"
},{
    name : "Crimson",
    1 : "1.jpg",
    2 : "2.jpg",
    3 : "3.jpg"
},{
    name : "Limegreen",
    1 : "1.png",
    2 : "2.jpg",
    3 : "3.jpg"
},{
    name : "Yellow",
    1 : "1.jpg",
    2 : "2.jpg",
    3 : "3.jpg"
}];
cbc.addEventListener('click', () => {
    var colorNumber = Math.floor(Math.random() * arrayOfColors.length);
    if(arrayOfColors[colorNumber].name == getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color')){
      if(colorNumber == arrayOfColors.length -1 ){
        colorNumber--;
      } else {
        colorNumber++;
      }
        
    }
    document.documentElement.style
    .setProperty('--primary-color', arrayOfColors[colorNumber].name);


    let img1 = `../assets/shards/${arrayOfColors[colorNumber].name}/${arrayOfColors[colorNumber][1]}`;
    let img1Link = 'url("' + img1 + '")';

    let img2 = `../assets/shards/${arrayOfColors[colorNumber].name}/${arrayOfColors[colorNumber][2]}`;
    let img2Link = 'url("' + img2 + '")';

    let img3 = `../assets/shards/${arrayOfColors[colorNumber].name}/${arrayOfColors[colorNumber][3]}`;
    let img3Link = 'url("' + img3 + '")';
    
    document.documentElement.style
    .setProperty('--img1', img1Link);

    document.documentElement.style
    .setProperty('--img2', img2Link);

    document.documentElement.style
    .setProperty('--img3', img3Link);

});
class Food{
    constructor(x,y){
        this.image=loadImage("Milk.png")
        this.foodStock=0;
        this.lastFed;        
    }

    getFoodStock(){
        return this.foodStock;

    }

    updateFoodStock(foodStock){
        this.foodStock=foodStock;    
    }

    deductFood(){
       if(this.foodStock>0){
           this.foodStock=this.foodStock-1;
       }
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    bedroom(){
        background(bedroomimg,250,250,500,500)
    }    

    garden(){
        background(gardenimg,250,250,500,500)
    }

    washroom(){
        background(washroomimg,250,250,500,500)
    }

    display(){

        var x=40;
        var y=60;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                
                if(i%10==0){
                    x=60
                    y=y+20
                }
                image(this.image,x,y,50,50)
                x=x+30
            }
           
        }
        
    }
}
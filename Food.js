class Food 


{
    constructor()
    {
        this.foodstock = 0;
        this.lastFed = 0;
        this.image = loadImage("Milk.png");
    }
    
     getFoodStock()
     {
        return this.foodstock;   
     }


    updateFoodStock(food) 
    {
        this.foodstock = food;
    }

    deductFood() 
    {
        if(this.foodstock>0) {
            this.foodstock = this.foodstock-1;
        }
        if(this.foodstock<=0){
            this.foodstock = 20;
        }
    }
    getFedTime(fedTime){
        this.lastFed = fedTime;
    }

    bedroom() {
        background(bedrmImage,550,500);
    }
    garden() {
        background(gardenImage,550,500);
    }
    washroom() {
        background(wshrmImage,550,500);
    }
    
    
    
    



    

    display() 
    {
        var x = 80;
        var y = 200;
 
    
        if(this.foodstock!=0) 
        {
            for(var i=0; i<this.foodstock;i++)
            {
                if(i%10==0){
                    x = 80;
                    y = y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    
    }

}


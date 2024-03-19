module.exports = {

    /**
     * This method base on distance between two point in km unit on the round surface of the earth
     * There's no guarantee It's will actually the same result when calculating these points on the road
     * 
     * @param startLocation Have float 1D array format [latitude, longitude]
     * @param endLocation Have float 1D array format [latitude, longitude]
     * 
     */
    calculateDistanceOneToOne(startLocation, endLocation){
        try {

            //https://www.geeksforgeeks.org/program-distance-two-points-earth/

            let latitudeStart = startLocation[0];
            let longitudeStart = startLocation[1];

            let latitudeEnd = endLocation[0];
            let longitudeEnd = endLocation[1];
            
            // The math module contains a function
            // named toRadians which converts from
            // degrees to radians.
            longitudeStart =  longitudeStart * Math.PI / 180;
            longitudeEnd = longitudeEnd * Math.PI / 180;
            latitudeStart = latitudeStart * Math.PI / 180;
            latitudeEnd = latitudeEnd * Math.PI / 180;
    
            // Haversine formula
            let dlon = longitudeEnd - longitudeStart;
            let dlat = latitudeEnd - latitudeStart;
            let a = Math.pow(Math.sin(dlat / 2), 2)
                    + Math.cos(latitudeStart) * Math.cos(latitudeEnd)
                    * Math.pow(Math.sin(dlon / 2),2);
                
            let c = 2 * Math.asin(Math.sqrt(a));
    
            // Radius of earth in kilometers. Use 3956
            // for miles
            let r = 6371;
    
            // calculate the result
            return(c * r);

        } catch (error) {
            throw error;
        }
    },

    calculateDistanceOneToMany(inputDate){
        try {

            

        } catch (error) {
            throw error;
        }
    }
}
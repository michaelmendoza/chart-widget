
export const GeoAdapter = (data : any[]) => {
    // Validate Data for GeoAdapter
    const geo = data[0].geo;
    if(!geo) return data;
    if(!geo.coordinates) return data;
    if(!geo.coordinates[0]) return data;

    // Adapt Geo property 
    return data.map((item : any)=> {
        return { ...item, geo:item.geo.coordinates[0] }
    })
}

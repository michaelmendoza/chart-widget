import React, {useEffect, useState} from 'react';

import { MapOptions } from '../ChartWidget/models/MapConstants';
import PointMap from '../ChartWidget/components/libraries/D3Charts/Map/PointMap';
import Loading from '../ChartWidget/components/libraries/Loading/Loading';
import { GeoAdapter } from '../ChartWidget/libraries/DataAdapter';
import DataServiceProvider from '../ChartWidget/services/data/DataServiceProvider';

const EntityPointMap = () => {

  const [ready, setReady] = useState(true);
  const [feedName, setFeedName] = useState('');
  const [availableFeeds, setAvailableFeeds] = useState([]);
  const [entityData, setEntityData] = useState([]);

  useEffect(()=> {
    updateFeeds();
  }, [])

  const updateFeeds = () => {
    const fetch = async () => {
      
      let availableCharts : any = await DataServiceProvider.fetchAvailableFeeds();
      setFeedName('')
      setAvailableFeeds(availableCharts);
    }
    fetch();
  }
  
  const updateMap = (feedName : string) => {

    const fetch = async () => {
      let entityData: any = []
      if(feedName) {
        entityData = await DataServiceProvider.fetchEntityDataByFeed({id:'0', name:feedName, attr:[]});
        entityData = GeoAdapter(entityData); 
        //const entityData: any = ChartDataService.getEntityDataByFeed('Lightning');
      }
      
      setReady(true);
      setEntityData(entityData);
    } 
    setReady(false);
    fetch();
  }

  const handleFeedNameChange = (event : any) => {
    setFeedName(event.target.value);
    updateMap(event.target.value);
  }

  const handleEntityCountChange = (event : any) => {
    
  }

  return (
    <div style={{margin:'2em'}}>

      <label>Entity Events</label>

      <div className='entity-controls'>
          <label>Data Source</label>
          <select onChange={handleFeedNameChange} value={feedName}> 
            <option value={''}>--</option>
            {
              availableFeeds.map((item:any) => <option key={item.name} value={item.name}>{item.name}</option>)
            }
          </select>
      </div>
            
      <div className='entity-controls'>
        <label>Entity Event Count</label>
        <input type="text" name="entitycount" value={entityData.length} onChange={handleEntityCountChange} />
      </div>

        
      {
        ready ? <PointMap map={MapOptions.USAStates} entityData={entityData} max={100000} width={500} height={500}></PointMap> : <Loading></Loading>
      }
      
    </div>
  )
}

export default EntityPointMap;
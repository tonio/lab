<script>
  import { onMount } from "svelte"

  import Map from "ol/Map"
  import View from "ol/View"
  import TileLayer from "ol/layer/Tile"
  import OSM from "ol/source/OSM"
  import GeoJSON from "ol/format/GeoJSON"
  import VectorLayer from "ol/layer/Vector"
  import VectorSource from "ol/source/Vector"
  import {Fill, RegularShape, Stroke, Style} from "ol/style"

  export let location
  export let room

  let el
  let map
  const stroke = new Stroke({
    color: "#999",
    width: 1
  })
  const fill = new Fill({color: 'yellow'})
  const line = new Style({ stroke })
  const star = new Style({
    image: new RegularShape({
      fill,
      stroke,
      points: 5,
      radius: 10,
      radius2: 4,
      angle: 0,
    })
  })
  const vector = new VectorLayer({
    source: new VectorSource({
      url: "map.geojson",
      format: new GeoJSON()
    }),
    style: f => 'room' in f.getProperties() && f.getProperties()['room'] !== ''
      ? f.getProperties()['room'] === room ? star : []
      : line
  })

  onMount(() => {
    map = new Map({
      layers: [
        new TileLayer({
          source: new OSM({attributions: ''})
        }),
        vector
      ],
      target: el,
      view: new View({
        center: [660632.247146, 5710889.258906],
        zoom: 18.5,
        rotation: -0.601,
      }),
      controls: [],
    })
    window.map = map
  })
</script>

<div bind:this={el} class="map">
  {#if location}
    <div class=location><span>{location}</span></div>
  {/if}
</div>

<style>
  .map {
    position: relative;
  }
  .location {
    text-align: center;
    z-index: 1;
    position: absolute;
    bottom: 0.5em;
    width: 100%;
  }
  .location span {
    display: inline-block;
    background: rgba(0,0,0,0.5);
    padding: 0.25em;
    text-align: center;
    color: var(--light);
    text-shadow: 0 0 1px black;
    border-radius: var(--radius);
  }
</style>

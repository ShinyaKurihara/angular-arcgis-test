import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer';
import TileLayer from '@arcgis/core/layers/TileLayer';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('mapViewDiv', { static: true }) private mapViewEl!: ElementRef<HTMLDivElement>;
  private view: MapView | null = null;
  private map!: Map;

  // 各レイヤーをメンバー変数として保持
  featureLayer1!: FeatureLayer;
  geojsonLayer!: GeoJSONLayer;
  tileLayer1!: TileLayer;
  topoLayer!: TileLayer;

  ngOnInit(): void {

    /*
    this.featureLayer1.opacity = 0.5;
    this.geojsonLayer.opacity = 0.5;
    this.tileLayer1.opacity = 0.5;
    this.topoLayer.opacity = 0.5;
    */


    this.map = new Map({
      basemap: 'streets-navigation-vector',
    });

    this.view = new MapView({
      container: this.mapViewEl.nativeElement,
      map: this.map,
      center: [139.767, 35.681],
      zoom: 12,
    });

    this.featureLayer1 = new FeatureLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3',
      opacity: 0.5,  // 生成時にopacity指定も可能
    });
    this.map.add(this.featureLayer1);

    this.geojsonLayer = new GeoJSONLayer({
      url: 'assets/japan.geojson',
      opacity: 0.5,  // 生成時にopacity指定も可能
    });
    this.map.add(this.geojsonLayer);

    this.tileLayer1 = new TileLayer({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
      opacity: 0.5,  // 生成時にopacity指定も可能
    });
    this.map.add(this.tileLayer1);

    this.topoLayer = new TileLayer({
      url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
      opacity: 0.5,  // 生成時にopacity指定も可能
    });
    this.map.add(this.topoLayer);
  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
      this.view = null;
    }
  }

  changeBasemap(basemap: string): void {
    if (this.map) {
      this.map.basemap = basemap as string; // 型が合わない場合はキャスト
    }
  }

  // レイヤーの表示・非表示切り替え関数
  toggleLayerVisibility(layerName: string): void {
    switch (layerName) {
      case 'featureLayer1':
        this.featureLayer1.visible = !this.featureLayer1.visible;
        break;
      case 'geojsonLayer':
        this.geojsonLayer.visible = !this.geojsonLayer.visible;
        break;
      case 'tileLayer1':
        this.tileLayer1.visible = !this.tileLayer1.visible;
        break;
      case 'topoLayer':
        this.topoLayer.visible = !this.topoLayer.visible;
        break;
    }
  }

isLayerVisible(layerName: string): boolean {
  switch (layerName) {
    case 'featureLayer1':
      return this.featureLayer1?.visible ?? false;
    case 'geojsonLayer':
      return this.geojsonLayer?.visible ?? false;
    case 'tileLayer1':
      return this.tileLayer1?.visible ?? false;
    case 'topoLayer':
      return this.topoLayer?.visible ?? false;
    default:
      return false;
  }
}


}

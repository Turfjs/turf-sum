var inside = require('turf-inside');

/**
 * Calculates the sum of a field for {@link Point} features within a set of {@link Polygon} features.
 *
 * @module turf/sum
 * @category aggregation
 * @param {FeatureCollection} polygons a FeatureCollection of {@link Polygon} features
 * @param {FeatureCollection} points a FeatureCollection of {@link Point} features
 * @param {String} inField the field in input data to analyze
 * @param {String} outField the field in which to store results
 * @return {FeatureCollection} a FeatureCollection of {@link Polygon} features
 * with properties listed as `outField`
 * @example
 * var polygons = turf.featurecollection([
 *   turf.polygon([[
 *     [-87.990188, 43.026486],
 *     [-87.990188, 43.062115],
 *     [-87.913284, 43.062115],
 *     [-87.913284, 43.026486],
 *     [-87.990188, 43.026486]
 *   ]]),
 *   turf.polygon([[
 *     [-87.973709, 42.962452],
 *     [-87.973709, 43.014689],
 *     [-87.904014, 43.014689],
 *     [-87.904014, 42.962452],
 *     [-87.973709, 42.962452]
 *   ]])
 * ]);
 * var points = turf.featurecollection([
 *   turf.point([-87.974052, 43.049321], {population: 200}),
 *   turf.point([-87.957229, 43.037277], {population: 600}),
 *   turf.point([-87.931137, 43.048568], {population: 100}),
 *   turf.point([-87.963409, 42.99611], {population: 200}),
 *   turf.point([-87.94178, 42.974762], {population: 300})
 * ]);
 *
 * var aggregated = turf.sum(
 *   polygons, points, 'population', 'sum');
 *
 * var result = turf.featurecollection(
 *   points.features.concat(aggregated.features));
 *
 * //=result
 */
module.exports = function(polyFC, ptFC, inField, outField){
  polyFC.features.forEach(function(poly){
    if(!poly.properties){
      poly.properties = {};
    }
    var values = [];
    ptFC.features.forEach(function(pt){
      if (inside(pt, poly)) {
        values.push(pt.properties[inField]);
      }
    });
    poly.properties[outField] = sum(values);
  });

  return polyFC;
};

function sum(x) {
    var value = 0;
    for (var i = 0; i < x.length; i++) {
        value += x[i];
    }
    return value;
}

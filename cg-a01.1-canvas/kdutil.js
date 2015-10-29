/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: KdUtil
 *
 * Loose collection of helper functions
 *
 */


/* requireJS module definition */
define([], (function() {

    "use strict";

    // start with an empty object
    var kdutil = {};


    /**
     * traverses tree and and adds bounding boxes to scene
     * Note: licky hacky
     *
     * @param sceneController - just passed down the tree
     * @param scene - just passed down the tree
     * @param node
     * @param dim
     * @param start
     * @param end
     * @param left
     */
    kdutil.visualizeKdTree = function(sceneController, scene, node, dim, start, end, left) {

        var style = {
            width: 1,
            color: "#0000ff"
        };

        scene.addObjects([node.bbox]);
        // deselect all objects, then select the newly created object
        sceneController.deselect();
        var nextDim = (dim === 0) ? 1 : 0;
        if (node.rightChild) {
            kdutil.visualizeKdTree(sceneController, scene, node.rightChild, nextDim, node.point.center[dim], end, left);
        }
        if (node.leftChild) {
            kdutil.visualizeKdTree(sceneController, scene, node.leftChild, nextDim, start, node.point.center[dim], left);
        }

    };

    /**
     * Linear search over all points
     *
     * @param pointList
     * @param queryPoint
     */
    kdutil.linearSearch = function(pointList, queryPoint) {
        var minDist = 100000;
        var minIdx = -1;
        for( var i=0; i<pointList.length; ++i) {
            var dist = kdutil.distance(pointList[i].center, queryPoint.center);
            if( dist < minDist ) {
                minIdx = i;
                minDist = dist;
            }
        }
        return minIdx;
    };


    kdutil.distance = function(p0, p1) {
        return Math.sqrt( (p0[0]-p1[0])*(p0[0]-p1[0]) + (p0[1]-p1[1])*(p0[1]-p1[1]) );
    };

    /**
     * computes median by sorting points along current axis
     * and returning the mid point index
     *
     * @param values - pointlist
     * @param dim - current axis
     * @returns int - index in array
     */
    kdutil.median = function(values, dim) {

        values.sort( function(a,b) {return a.center[dim] - b.center[dim];} );

        var half = Math.floor(values.length/2);

        return half;
    };

    return kdutil;

})); // require


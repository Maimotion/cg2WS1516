/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Hartmut Schirmacher, hschirmacher.beuth-hochschule.de
 * changes by Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: straight_line
 *
 * A StraighLine knows how to draw itself into a specified 2D context,
 * can tell whether a certain mouse position "hits" the object,
 * and implements the function createDraggers() to create a set of
 * draggers to manipulate itself.
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene", "PointDragger"],
    (function(util,vec2,Scene,PointDragger) {

        "use strict";

        /**
         *  A simple straight line that can be dragged
         *  around by its endpoints.
         *  Parameters:
         *  - point0 and point1: array objects representing [x,y] coordinates of start and end point
         *  - lineStyle: object defining width and color attributes for line drawing,
         *       begin of the form { width: 2, color: "#00FF00" }
         */

        var Circle = function(point0, radius, lineStyle) {

            console.log("creating Circle with center at [" +
            point0[0] + "," + point0[1] + "] and [" +
            radius + "].");

            // draw style for drawing the line
            this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.p0 = point0 || [10,10];
            this.radius = radius || 65;

            // draw this line into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual line
                context.beginPath();

                context.arc(this.p0[0], this.p0[1],this.radius,0,2*Math.PI);

                // set drawing style
                context.lineWidth = this.lineStyle.width;
                context.strokeStyle = this.lineStyle.color;

                // actually start drawing
                context.stroke();

            };

            // test whether the mouse position is on this circle
            this.isHit = function(context,pos) {

                // project point on circle, get distance of that projection point to circle
                var t = vec2.projectPointOnCircle(pos, this.p0, this.radius);

                // allow 2 pixels extra "sensitivity"
                if(t < (this.lineStyle.width/2)+2 && t > (this.lineStyle.width/2)-2){
                    return true;
                }else{
                    return false;
                }
            };

            // return list of draggers to manipulate this line
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true }
                var draggers = [];

                // create closure and callbacks for dragger
                var _circle = this;
                var getP0 = function() { return _circle.p0; };
                var getP1 = function() { 
                    var pRad = [_circle.p0[0]+_circle.radius, _circle.p0[1]];
                    return pRad;
                };
                var setP0 = function(dragEvent) { _circle.p0 = dragEvent.position; };
                var setP1 = function(dragEvent) { 
                    _circle.p1 = dragEvent.position; 
                    //new radius = length of new p1-p0
                    _circle.radius = vec2.length(vec2.sub(_circle.p1, _circle.p0));
                };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
                draggers.push( new PointDragger(getP1, setP1, draggerStyle) );
                return draggers;
            };


        };

        // this module only exports the constructor for Circle-objects
        return Circle;

    })); // define

    

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

        var Point = function(point0, lineStyle) {

            console.log("creating point at [" +
            point0[0] + "," + point0[1] + "].");

            // draw style for drawing the line
            this.lineStyle = lineStyle || { width: "2", color: "#0000AA" };

            // initial values in case either point is undefined
            this.p0 = point0 || [100,100];
           

                       // draw this line into the provided 2D rendering context
            this.draw = function(context) {

                // draw actual line
                context.beginPath();

                context.arc(this.p0[0], this.p0[1],1,0,2*Math.PI);

                // set drawing style
                context.lineWidth = 1;
                context.strokeStyle = this.lineStyle.color;

                // actually start drawing
                context.stroke();

            };

           // test whether the mouse position is on this circle
            this.isHit = function(context,pos) {

                // project point on circle, get distance of that projection point to circle
                var t = vec2.projectPointOnPoint(pos, this.p0);

                // allow 2 pixels extra "sensitivity"
                if(t < (this.lineStyle.width/2)+2 && t > (this.lineStyle.width/2)-2){
                    return true;
                }else{
                    return false;
                }
            };

            // return list of draggers to manipulate this line
            this.createDraggers = function() {

                var draggerStyle = { radius:4, color: this.lineStyle.color, width:0, fill:true };
                var draggers = [];

                // create closure and callbacks for dragger
                var _point = this;
                var getP0 = function() { return _point.p0; };
                var setP0 = function(dragEvent) { _point.p0 = dragEvent.position; };
                draggers.push( new PointDragger(getP0, setP0, draggerStyle) );
               
                return draggers;

            };


        };

        // this module only exports the constructor for StraightLine objects
        return Point;

    })); // define

    

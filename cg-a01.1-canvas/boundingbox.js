/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: boundingbox
 *
 *
 */


/* requireJS module definition */
define(["util", "vec2", "Scene"],
    (function(Util,vec2,Scene) {

        "use strict";

        var BoundingBox = function (xmin, ymin, xmax, ymax, point, dim) {

            this.xmin = xmin;
            this.xmax = xmax;
            this.ymin = ymin;
            this.ymax = ymax;

            this.point = point;
            this.dim = dim;

            // distance squared from p to closest point on this axis-aligned rectangle
            this.distanceTo = function(p) {
                var dx = 0.0, dy = 0.0;
                if      (p[0] < this.xmin) dx = p[0] - this.xmin;
                else if (p[0] > this.xmax) dx = p[0] - this.xmax;
                if      (p[1] < this.ymin) dy = p[1] - this.ymin;
                else if (p[1] > this.ymax) dy = p[1] - this.ymax;
                return Math.sqrt(dx*dx + dy*dy);
            };

            /**
             * Draws line though the bounding box where the point
             * lies. Note: Don't use with large number of points
             *
             * @param context
             */
            this.draw = function(context) {

                //context.rect(xmin,ymin,xmax-xmin,ymax-ymin);

                // draw actual line
                context.beginPath();
                // set points to be drawn
                if( this.dim == 0 ) {
                    context.moveTo(this.point.center[0], this.ymin);
                    context.lineTo(this.point.center[0], this.ymax);
                } else {
                    context.moveTo(this.xmin, this.point.center[1]);
                    context.lineTo(this.xmax, this.point.center[1]);
                }

                context.lineWidth = 1;

                context.stroke();

            }
        };

        return BoundingBox;


    })); // define



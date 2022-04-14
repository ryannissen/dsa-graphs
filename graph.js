/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {

    this.nodes.add(vertex);

   }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {

    for (let v of vertexArray){
      this.addVertex(v);
    }

   }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {

    v1.adjacent.add(v2);
    v2.adjacent.add(v1);

   }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {

    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);

   }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {

    this.nodes.delete(vertex);

    for (let a of vertex.adjacent) {
      vertex.adjacent.delete(a);
      a.adjacent.delete(vertex);
    }

   }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {

    let toVisitStack = [start];
    let seen = new Set(toVisitStack);

    let output = [];

    while (toVisitStack.length > 0) {
      let currPerson = toVisitStack.pop();

      output.push(currPerson.value);

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    console.log(output);
    return output;
   }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {

    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);

    let output = [];

    while (toVisitQueue.length > 0) {
      let currPerson = toVisitQueue.shift();

      output.push(currPerson.value);

      for (let neighbor of currPerson.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return output;
   }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, distance = 0, seen) {
    // let toVisitStack= [start];
    // let seen= new Set(start);
    // let distanceArr = [];
    // let count = 0;

    // while (toVisitStack.length > 0) {
    //   let currPerson = toVisitStack.pop();
    //   count++;

    //   if(currPerson.value === end.value) {
    //     distanceArr.push(count);
    //     count -= 1;

    //   }

    //   for (let neighbor of currPerson.adjacent) {
    //     if (!seen.has(neighbor)) {
    //       toVisitStack.push(neighbor);
    //       seen.add(neighbor);
    //     }
    //   }
    // }

    if(start === end) return distance;
    let toVisitStack= [start];
    let seen = new Set(start);

    while(toVisitStack.length > 0){
      let current = toVisitStack.pop();

      for(let f of current.adjacent){

        if (!seen.has(f)) {
          toVisitStack.push(f);
          seen.add(f);
          let nodesNum = Math.min(this.distanceOfShortestPath(f, end, distance + 1, seen) || 0)
          return nodesNum;
        }
      }
    }
  }
}

module.exports = { Graph, Node }

/*
call(r)
stack = [t]
seen = Set(r,t)

r adjancent = [t,i,h]

!!!!!!!!!!!!!!!!!!!!!!!!

call(t)
stack = [i]
seen = [r, t, i]

t adjancent = [r, i, h]

!!!!!!!!!!!!!!!!!!!!!!!!

call(i)
stack = []
seen = [r,t,i]

i adjancet = [r,t]


*/
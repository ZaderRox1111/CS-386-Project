// P(n,r) = n!/(n-r)!
// calls subfactorial() to compute a factorial for n and n-r
function P( n, r) { 
    return subFactorial( n, n-r );
}

// C(n,r) = n!/(r!(n-r)!) = P(n,r)/r!
// combination is the permunation of n and r over subfactorial() r
function C( n, r ) { 
    if( r > n / 2 )
        //Optimization so subFactorial has less total steps, given that C(n,r) = C(n,n-r)
        r = n - r; 

    return P( n, r ) / subFactorial( r, 1 );
}

//subFactorial(a,b) = a!/b!, subFactorial(a,1) = a!
function subFactorial( a, b ) { 
    var fac = 1;

    for(let i = b + 1; i <= a; i++ )
        fac *= i;

    return fac;
}

// General union: P(A∪B)=P(A)+P(B)−P(A∩B)
function union( probA, probB ){
    return probA + probB - intersect( probA, probB );
}

// Intersection equation if Prob A and B are independent: P(A∩B) = P(A)*P(B)
function intersect( probA, probB ){
    return probA * probB;
}

module.exports = {
    P,
    C,
    union,
    intersect
};

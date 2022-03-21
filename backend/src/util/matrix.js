//TODO: Add Export statements for all classes in this file, and whatever other functions you deem necessary

class AbstractMatrix {
	#matrix;
	rows; cols;
	constructor(rows,cols,e) {
		if(rows<1||cols<1)
			throw 'New matrix must be at least 1x1.';
		this.rows=rows;
		this.cols=cols;
		this.matrix=[];
		this.matrix.length=rows;
		for(let i=0;i<rows;i++) {
			this.matrix[i]=[];
			this.matrix[i].length=cols;
		}
		if(e!=null)
			for(let i=0;i<this.rows;i++)
				for(let j=0;j<this.cols;j++)
					this.matrix[i][j]=e;
	}
	clone() {
		let mat=new AbstractMatrix(this.rows,this.cols,null);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<this.cols;j++)
				mat.set(i,j,this.get(i,j));
		return mat;
	}
	get(row,col) {
		return this.matrix[row][col];
	}
	set(row,col,e) {
		this.matrix[row][col]=e;
	}
	operateElementWise(mat,op) {
		if(this.rows!=mat.rows||this.cols!=mat.cols)
			throw 'Matrix dimensions must match.';
		const res=new Matrix(this.rows,this.cols);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<this.cols;j++)
				res.set(i,j,op(this.get(i,j),mat.get(i,j)));
		return res;
	}
	getCol(col) {
		const copy=[];
		for(let i=0;i<this.rows;i++)
			copy[i]=this.matrix[i][col];
		return copy;
	}
	setCol(col,data) {
		if(data.length!=this.rows)
			throw 'Column does not match matrix dimensions.';
		for(let i=0;i<this.rows;i++)
			this.matrix[i][col]=data[i];
	}
	getRow(row) {
		const copy=[];
		for(let i=0;i<this.cols;i++)
			copy[i]=this.matrix[row][i];
		return copy;
	}
	setRow(row,data) {
		if(data.length!=this.cols)
			throw 'Row does not match matrix dimensions.';
		for(let i=0;i<this.cols;i++)
			this.matrix[row][i]=data[i];
	}
	minor(row,col) {
		const minor=new Matrix(this.rows-1,this.cols-1);
		var iN=0;
		var jN=0;
		for(let i=0;i<this.rows;i++) if(i!=row) {
			for(let j=0;j<this.cols;j++) if(j!=col) {
				minor.set(iN,jN,this.get(i,j));
				jN++;
			}
			iN++;
		}
		return minor;
	}
	concat(mat) {
		if(this.rows!=mat.rows)
			throw 'Concatenated matrices must be the same height.';
		const res=new AbstractMatrix(this.rows,this.cols+mat.cols);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<this.cols;j++)
				res.set(i,j,this.get(i,j));
		for(let i=0;i<mat.rows;i++)
			for(let j=0;j<mat.cols;j++)
				res.set(i,j+this.cols,mat.get(i,j));
		return res;
	}
	transpose() {
		let trans=new AbstractMatrix(this.cols,this.rows,null);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<this.cols;j++)
				trans.set(j,i,this.get(i,j));
		return trans;
	}
	swapRow(r1,r2) {
		let temp=this.matrix[r1];
		this.matrix[r1]=this.matrix[r2];
		this.matrix[r2]=temp;
	}
}
AbstractMatrix.prototype.toString=function() {
	let str='';
	for(let i=0;i<this.rows;i++) {
		str+='[\t';
		for(let j=0;j<this.cols;j++)
			str+=this.get(i,j)+"\t";
		str+=']\n';
	}
	return str;
};

class RealMatrix extends AbstractMatrix {
	constructor(rows,cols) {
		super(rows,cols,0);
	}
	add(mat) {
		return this.operateElementWise(mat,function(a,b) {return a+b;});
	}
	multiply(mat) {
		if(this.cols!=mat.rows)
			throw 'Illegal matrix dimensions for multiplication.';
		const prod=new Matrix(this.rows,mat.cols);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<mat.cols;j++)
				prod.set(i,j,dot(this.getRow(i),mat.getCol(j)));
		return prod;
	}
	det() {
		if(this.rows!=this.cols)
			throw 'Determinant is only defined for square matrices.';
		if(this.rows==1)
			return this.get(0,0);
		var det=0;
		var sign=1;
		for(let i=0;i<this.cols;i++) {
			det+=sign*this.get(0,i)*this.minor(0,i).det();
			sign*=-1;
		}
		return det;
	}
	leadZeros(row) {
		for(let i=0;i<this.cols;i++)
			if(this.get(row,i)!=0)
				return i;
		return this.cols;
	}
	sortRowsByLeadZeros() {
		const mat=this.clone();
		var zeroCounts=[];
		zeroCounts.length=mat.rows;
		for(let i=0;i<mat.rows;i++)
			zeroCounts[i]=this.leadZeros(i);
		for(let i=0;i<mat.rows-1;i++) {
			var min=[i,zeroCounts[i]];
			for(let j=i+1;j<mat.rows;j++)
				if(zeroCounts[j]<min[1]) {
					min[0]=j;
					min[1]=zeroCounts[j];
				}
			if(min[0]!=i) {
				mat.swapRow(min[0],i);
				zeroCounts[min[0]]=zeroCounts[i];
				zeroCounts[i]=min[1];
			}
		}
		return mat;
	}
	ref() {
		const ref=this.sortRowsByLeadZeros();
		var row,leadPos;
		for(let i=0;i<this.rows;i++) {
			row=ref.getRow(i);
			leadPos=ref.leadZeros(i);
			if(leadPos==ref.cols)
				break;
			for(let j=i+1;j<ref.rows;j++) {
				let subRow=ref.getRow(j);
				subRow=addVectors(subRow,vectorByScalar(row,-1*subRow[leadPos]/row[leadPos]));
				ref.setRow(j,subRow);
			}
		}
		return ref;
	}
	rref() {
		const rref=this.ref();
		var row,leadPos;
		for(let i=0;i<this.rows;i++) {
			row=rref.getRow(i);
			leadPos=rref.leadZeros(i);
			if(leadPos==rref.cols)
				break;
			rref.setRow(i,vectorByScalar(row,1/row[leadPos]))
			for(let j=0;j<i;j++) {
				let subRow=rref.getRow(j);
				subRow=addVectors(subRow,vectorByScalar(row,-1*subRow[leadPos]/row[leadPos]));
				rref.setRow(j,subRow);
			}
		}
		return rref;
	}
}
RealMatrix.prototype.clone=function() {
	const mat=new RealMatrix(this.rows,this.cols);
	for(let i=0;i<this.rows;i++)
		mat.setRow(i,this.getRow(i));
	return mat;
}

class ComplexMatrix extends AbstractMatrix { //Will write ComplexMatrix after we've got the whole thing working for RealMatrix. bear with me
	constructor(rows,cols) {
		super(rows,cols,new ComplexNumber(0,0));
	}
	add(mat) {
		return this.operateElementWise(mat,function(a,b) {return a.add(b);});
	}
	multiply(mat) {
		if(this.cols!=mat.rows)
			throw 'Illegal matrix dimensions for multiplication.';
		const prod=new Matrix(this.rows,mat.cols);
		for(let i=0;i<this.rows;i++)
			for(let j=0;j<mat.cols;j++)
				prod.set(i,j,dotComplex(this.getRow(i),mat.getCol(j)));
		return prod;
	}
	adjoint() {
		const res=this.transpose();
		for(let i=0;i<res.rows;i++)
			for(let j=0;j<res.cols;j++)
				res.set(i,j,res.get(i,j).conj());
		return res;
	}
}

class ComplexNumber {
	re; im;
	constructor(re,im) {
		this.re=re;
		this.im=im;
	}
	conj() {
		return new ComplexNumber(this.re,-1*this.im);
	}
	inverse() {
		let denom=this.re*this.re+this.im*this.im;
		return new ComplexNumber(this.re/denom,-this.im/denom);
	}
	add(z) {
		return new ComplexNumber(this.re+z.re,this.im+z.im);
	}
	subtract(z) {
		return this.add(z.multiplyScalar(-1));
	}
	multiply(z) {
		let re=this.re*z.re-this.im*z.im;
		let im=this.re*z.im+this.im*z.re;
		return new ComplexNumber(re,im);
	}
	divide(z) {
		return this.multiply(z.inverse());
	}
	multiplyScalar(c) {
		return new ComplexNumber(c*this.re,c*this.im);
	}
}
ComplexNumber.prototype.toString=function() {
	var op="";
	if(this.im>=0)
		op="+";
	return this.re+op+this.im+"i";
};

function realMatrixFromJSON(json) {
	const mat=new RealMatrix(json.rows,json.cols);
	for(let i=0;i<json.entries.length;i++)
		mat.set(Math.floor(i/json.cols),i%json.cols);
	return mat;
}
function vectorByScalar(v,c) {
	let prod=[];
	prod.length=v.length;
	for(let i=0;i<v.length;i++)
		prod[i]=c*v[i];
	return prod;
}
function addVectors(v1,v2) {
	if(v1.length!=v2.length)
		throw 'Vectors must be the same length.';
	let sum=[];
	sum.length=v1.length;
	for(let i=0;i<v1.length;i++)
		sum[i]=v1[i]+v2[i];
	return sum;
}
function dot(v1,v2) {
	if(v1.length!=v2.length)
		throw 'Vectors must be the same length.';
	let sum=0;
	for(let i=0;i<v1.length;i++)
		sum+=v1[i]*v2[i];
	return sum;
}
function dotComplex(v1,v2) {
	if(v1.length!=v2.length)
		throw 'Vectors must be the same length.';
	let sum=new ComplexNumber(0,0);
	for(let i=0;i<v1.length;i++)
		sum=sum.add(v1[i].multiply(v2[i]));
	return sum;
}

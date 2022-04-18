package thebestcsgroup.quikmafs;
public enum Unit {
	PM(Type.LENGTH,"picometer"),
	NM(Type.LENGTH,"nanometer"),
	UM(Type.LENGTH,"micrometer"),
	MM(Type.LENGTH,"millimeter"),
	CM(Type.LENGTH,"centimeter"),
	DM(Type.LENGTH,"decimeter"),
	M(Type.LENGTH,"meter"),
	KM(Type.LENGTH,"kilometer"),
	IN(Type.LENGTH,"inch"),
	FT(Type.LENGTH,"foot"),
	YD(Type.LENGTH,"yard"),
	MI(Type.LENGTH,"mile"),
	ML(Type.VOLUME,"milliliter"),
	L(Type.VOLUME,"liter"),
	M3(Type.VOLUME,"cubic meter"),
	ITSP(Type.VOLUME,"imperial teaspoon"),
	ITBSP(Type.VOLUME,"imperial tablespoon"),
	IFLOZ(Type.VOLUME,"imperial fluid ounce"),
	ICUP(Type.VOLUME,"imperial cup"),
	IPT(Type.VOLUME,"imperial pint"),
	IQT(Type.VOLUME,"imperial quart"),
	IGAL(Type.VOLUME,"imperial gallon"),
	USTSP(Type.VOLUME,"US teaspoon"),
	USTBSP(Type.VOLUME,"US tablespoon"),
	USFLOZ(Type.VOLUME,"US fluid ounce"),
	USCUP(Type.VOLUME,"US cup"),
	USPT(Type.VOLUME,"US pint"),
	USQT(Type.VOLUME,"US quart"),
	USGAL(Type.VOLUME,"US gallon"),
	IN3(Type.VOLUME,"cubic inch"),
	FT3(Type.VOLUME,"cubic foot"),
	PS(Type.TIME,"picosecond"),
	NS(Type.TIME,"nanosecond"),
	US(Type.TIME,"microsecond"),
	MS(Type.TIME,"millisecond"),
	S(Type.TIME,"second"),
	MIN(Type.TIME,"minute"),
	HR(Type.TIME,"hour"),
	DAY(Type.TIME,"day"),
	WK(Type.TIME,"week"),
	MO(Type.TIME,"month"),
	YR(Type.TIME,"year"),
	DECADE(Type.TIME,"decade"),
	DALTON(Type.MASS,"dalton"),
	UG(Type.MASS,"microgram"),
	MG(Type.MASS,"milligram"),
	G(Type.MASS,"gram"),
	KG(Type.MASS,"kilogram"),
	STONE(Type.MASS,"stone"),
	T(Type.MASS,"Metric ton"),
	OZ(Type.MASS,"ounce"),
	LBS(Type.MASS,"pound"),
	UST(Type.MASS,"US ton"),
	IT(Type.MASS,"Imperial ton");
	public final Type type;
	private final String displayName;
	private Unit(Type type,String displayName) {
		this.type=type;
		this.displayName=displayName;
	}
	@Override
	public String toString() {
		return displayName;
	}
	public static enum Type {
		LENGTH("Length"),
		VOLUME("Volume"),
		TIME("Time"),
		MASS("Mass");
		private final String displayName;
		private Type(String displayName) {
			this.displayName=displayName;
		}
		@Override
		public String toString() {
			return displayName;
		}
	}
}

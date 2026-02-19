
export interface RegionData {
    provinces: string[];
    cities: Record<string, string[]>; // Province -> Cities
    districts: Record<string, string[]>; // City -> Districts
    postalCodes: Record<string, string[]>; // District -> Postal Codes or specific mapping
}

// Data Seed for Kota Bandung, Jawa Barat
export const INDONESIA_REGIONS = {
    provinces: ["Jawa Barat"],
    cities: {
        "Jawa Barat": ["Kota Bandung", "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kota Cimahi"]
    },
    districts: {
        "Kota Bandung": [
            "Andir", "Astana Anyar", "Antapani", "Arcamanik", "Babakan Ciparay",
            "Bandung Kidul", "Bandung Kulon", "Bandung Wetan", "Batununggal",
            "Bojongloa Kaler", "Bojongloa Kidul", "Buahbatu", "Cibeunying Kaler",
            "Cibeunying Kidul", "Cibiru", "Cicendo", "Cidadap", "Cinambo",
            "Coblong", "Gedebage", "Kiaracondong", "Lengkong", "Mandalajati",
            "Panyileukan", "Rancasari", "Regol", "Sukajadi", "Sukasari",
            "Sumur Bandung", "Ujung Berung"
        ]
    },
    // Simplified Postal Codes mapping (District -> First valid code or list)
    // Source: Generic Bandung Data
    postalCodes: {
        "Andir": ["40181", "40182", "40183", "40184"],
        "Astana Anyar": ["40241", "40242", "40243"],
        "Antapani": ["40291"],
        "Arcamanik": ["40293"],
        "Babakan Ciparay": ["40221", "40222", "40223"],
        "Bandung Kidul": ["40266", "40267", "40268"],
        "Bandung Kulon": ["40211", "40212", "40213", "40214", "40215"],
        "Bandung Wetan": ["40114", "40115", "40116"],
        "Batununggal": ["40271", "40272", "40273", "40274"],
        "Bojongloa Kaler": ["40231", "40232", "40233"],
        "Bojongloa Kidul": ["40234", "40235", "40236"],
        "Buahbatu": ["40286", "40287"],
        "Cibeunying Kaler": ["40121", "40122", "40123"],
        "Cibeunying Kidul": ["40124", "40125", "40126", "40127", "40128"],
        "Cibiru": ["40611", "40613", "40614", "40615"],
        "Cicendo": ["40171", "40172", "40173", "40174", "40175"],
        "Cidadap": ["40141", "40142", "40143"],
        "Cinambo": ["40294"],
        "Coblong": ["40131", "40132", "40133", "40134", "40135"],
        "Gedebage": ["40295"],
        "Kiaracondong": ["40281", "40282", "40283", "40284", "40285"],
        "Lengkong": ["40261", "40262", "40263", "40264", "40265"],
        "Mandalajati": ["40191", "40192", "40193", "40194"],
        "Panyileukan": ["40614"],
        "Rancasari": ["40292"],
        "Regol": ["40251", "40252", "40253", "40254", "40255"],
        "Sukajadi": ["40161", "40162", "40163", "40164"],
        "Sukasari": ["40151", "40152", "40153", "40154"],
        "Sumur Bandung": ["40111", "40112", "40113"],
        "Ujung Berung": ["40611"]
    }
};

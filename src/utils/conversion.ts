export function hexToNumber(hex: string): number {
    const cleanHex = hex
      .toLowerCase()
      .replace("#", "")
      .replace("0x", "");
  
    if (!/^[0-9a-f]{6}$/.test(cleanHex)) {
      throw new Error("Invalid hex color");
    }
  
    return parseInt(cleanHex, 16);
  }

  export function numberToHex(num: number): string {
    if (num < 0 || num > 0xffffff) {
      throw new Error("Number out of RGB range");
    }
  
    return "#" + num.toString(16).padStart(6, "0");
  }
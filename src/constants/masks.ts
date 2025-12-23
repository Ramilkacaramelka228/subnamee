interface MaskOption {
  cidr: number
  value: string
  label: string
}

const generateMasks = (): MaskOption[] => {
  const masks: MaskOption[] = []
  for (let i = 0; i <= 32; i++) {
    const bits = '1'.repeat(i) + '0'.repeat(32 - i)
    const octets: number[] = []

    for (let k = 0; k < 32; k += 8) {
      octets.push(parseInt(bits.substring(k, k + 8), 2))
    }
    const maskString = octets.join('.')

    masks.push({
      cidr: i,
      value: maskString,
      label: `/${i} — ${maskString}`,
    })
  }
  return masks.reverse()
}

export const SUBNET_MASKS = generateMasks()

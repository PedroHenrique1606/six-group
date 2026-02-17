import axios from "axios";

export interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  ddd: string;
}

const VIA_CEP_BASE = "https://viacep.com.br/ws";

export async function fetchCep(cep: string): Promise<CepResponse | null> {
  const digits = cep.replace(/\D/g, "");
  if (digits.length !== 8) return null;
  try {
    const { data } = await axios.get<CepResponse | { erro: boolean }>(
      `${VIA_CEP_BASE}/${digits}/json/`,
      { timeout: 8000 }
    );
    if (data && "erro" in data && data.erro) return null;
    return data as CepResponse;
  } catch {
    return null;
  }
}

export const FREE_SHIPPING_THRESHOLD = 197;
export const DEFAULT_SHIPPING = 19.9;

export function getShippingValue(
  subtotal: number,
  cepValid: boolean
): number {
  if (!cepValid) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING;
}

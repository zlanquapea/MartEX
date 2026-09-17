import type { Metadata } from "next";
import { company } from "@/content/site";
export function metadata(title:string, description:string):Metadata { return {title:title===company.name?title:`${title} | ${company.name}`,description,openGraph:{title,description,type:"website",siteName:company.name},twitter:{card:"summary_large_image",title,description}}; }
export function organizationJsonLd(){return {"@context":"https://schema.org","@type":"Organization",name:company.name,description:company.description,foundingDate:String(company.established),address:{"@type":"PostalAddress",addressLocality:"Monrovia",addressCountry:"LR"}}}

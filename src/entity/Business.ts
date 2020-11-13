/* eslint-disable camelcase */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import IBusiness from "./IBusiness";
import IProject from "./IProject";

@Entity()
export default class Business implements IBusiness {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_name!: string;

  @Column({ type: "text", nullable: true })
  company_logo!: string;

  @Column({ type: "text", nullable: true })
  company_photo!: string;

  @Column({ type: "text", nullable: true })
  tagline!: string;

  @Column({ type: "text", nullable: true })
  year_founded!: string;

  @Column({ type: "text", nullable: true })
  location!: string;

  @Column({ type: "text", nullable: true })
  company_size!: string;

  @Column({ type: "text", nullable: true })
  company_stage!: string;

  @Column({ type: "text", nullable: true })
  industry!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column({ type: "text", nullable: true })
  external_link_urls!: string;

  @Column({ type: "text", nullable: true })
  culture!: string;

  @Column({ type: "text", nullable: true })
  employees!: string;

  @Column({ type: "text", nullable: true })
  previous_projects!: IProject[];

  @Column({ type: "text", nullable: true })
  ongoing_projects!: IProject[];

  @Column({ type: "text", nullable: true })
  available_projects!: IProject[];
}

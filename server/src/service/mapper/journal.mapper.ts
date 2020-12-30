import { Journal } from '../../domain/journal.entity';
import { JournalDTO } from '../dto/journal.dto';

/**
 * A Journal mapper object.
 */
export class JournalMapper {
  static fromDTOtoEntity(entityDTO: JournalDTO): Journal {
    if (!entityDTO) {
      return;
    }
    let entity = new Journal();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Journal): JournalDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new JournalDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
